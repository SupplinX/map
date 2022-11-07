// @ts-nocheck
import { Marker } from "@react-google-maps/api";
import { FC } from "react";

interface IProps {
    mapProjection?: google.maps.Projection
    pos1: google.maps.LatLng;
    pos2: google.maps.LatLng;
    zoom: number;
}

export const CurveMarker: FC<IProps> = ({ pos1, pos2, mapProjection, zoom }) => {
    if (!mapProjection) return <div />;
    var curvature = -0.4;

    const p1 = mapProjection.fromLatLngToPoint(pos1),
        p2 = mapProjection.fromLatLngToPoint(pos2);

    // Calculating the arc.
    const e = new google.maps.Point(p2.x - p1.x, p2.y - p1.y), // endpoint
        m = new google.maps.Point(e.x / 2, e.y / 2), // midpoint
        o = new google.maps.Point(e.y, -e.x), // orthogonal
        c = new google.maps.Point(m.x + curvature * o.x, m.y + curvature * o.y); //curve control point

    const pathDef = "M 0,0 " + "q " + c.x + "," + c.y + " " + e.x + "," + e.y;

    const scale = 1 / Math.pow(2, -zoom);

    const symbol = {
        path: pathDef,
        scale: scale,
        strokeWeight: 2,
        strokeColor: "#ff",
        fillColor: "none"
    };

    return <Marker position={pos1} clickable={false} icon={symbol} zIndex={0} />;
};

export function kurwaNaMapie(startp: any, ctl1: any, ctl2: any, endp: any, options: any, map: any) {
    //co to jest kurwa bezjera (wzór na podstawie którego wykonamy zaklęcia): https://en.wikipedia.org/wiki/B%C3%A9zier_curve

    var defaultOpts = {
        startArrow: false, // można w sumie olać, raczej strzałek nie będzie
        endArrow: false, // j/w
        step: 0.05, //gęstość narysowanych kroków, 0.05 daje całkiem spoko wynik, ale może będzie trzeba to uzależnić od odległości.. wyjdzie w praniu
        lineopts: { //standardowe propertisy google mapsowych polylinów
            strokeOpacity: 1.0,
            strokeColor: '#ff0000'
        }
    };
    // publicznie dostępne propertisy.. może nie koniecznie muszą pozostać publiczne, chuj wie czemu je tak zrobiłem :)
    this.points = [];

    this.startp = startp;
    this.endp = endp;
    this.ctl1 = ctl1;
    this.ctl2 = ctl2;
    this.options = { ...defaultOpts, ...options };
    this.map = map;

    //tu dzieje się magia kurew
    function calcPoints(startp: any, ctl1: any, ctl2: any, endp: any, step: any) {
        var points = [];

        for (var it = 0; it <= 1; it += step) {
            points.push(getBezier(
                { x: startp.lat(), y: startp.lng() },
                { x: ctl1.lat(), y: ctl1.lng() },
                { x: ctl1.lat(), y: ctl1.lng() },
                { x: endp.lat(), y: endp.lng() },
                it));
        }

        points.push({ x: startp.lat(), y: startp.lng() });

        return points;
    };

    const B1 = function (t) { return t * t * t; };
    const B2 = function (t) { return 3 * t * t * (1 - t); };
    const B3 = function (t) { return 3 * t * (1 - t) * (1 - t); };
    const B4 = function (t) { return (1 - t) * (1 - t) * (1 - t); };

    function getBezier(C1, C2, C3, C4, percent) {
        var pos = {};
        pos.x =
            C1.x * B1(percent) +
            C2.x * B2(percent) +
            C3.x * B3(percent) +
            C4.x * B4(percent);
        pos.y =
            C1.y * B1(percent) +
            C2.y * B2(percent) +
            C3.y * B3(percent) +
            C4.y * B4(percent);
        return pos;
    };


    //publiczne funkcje, najważniejsze to init i draw, draw odpowiada za wykonanie zaklęcia
    this.init = function () {
        this.points = calcPoints(this.startp, this.ctl1, this.ctl2,
            this.endp, this.options.step);
        return this;
    }

    this.getPoints = function () {
        return this.points;
    }

    this.draw = function () {
        var points = this.points;

        for (var i = 0; i < points.length - 1; i++) {
            var firstp = (i == 0);
            var lastp = (i == points.length - 2);
            var lineopts = { ...{}, ...this.options.lineopts };

            lineopts.path = [
                new google.maps.LatLng(points[i].x, points[i].y)
                , new google.maps.LatLng(points[i + 1].x, points[i + 1].y)
            ];

            if (firstp && this.options.endArrow) {
                lineopts.icons = [{
                    icon: {
                        path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                    }
                    , offset: '0%'
                }];

            }
            if (lastp && this.options.startArrow) {
                lineopts.icons = [{
                    icon: {
                        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                    }
                    , offset: '100%'
                }];
            }

            var line = new google.maps.Polyline(lineopts);
            line.setMap(this.map);
        }

        return this;
    }
}