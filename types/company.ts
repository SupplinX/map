export type ICompany = {
    id: number;
    name: string;
    lat: string;
    lng: string;
    description: string;
    logo: {
        id: number;
        url: string;
    };
    quick_summary: string;
    country: string;
    city: string;
    street_code: string;
    street: string;
    linkedin: string;
    website: string;
    twitter: string;
    facebook: string;
    instagram: string;
    youtube: string;
    polywork: string;
    email: string;
    size: string;
    tiktok: string;
    funding_date: string;
    products: IProduct[];
    partners: IConnection[];
    mother_company: ICompany;
    child_companies: ICompany[];
    main_industry: IIndustry;
    needs: IProduct[]
}

export type IProduct = {
    id: number;
    name: string;
    image: {
        url: string;
    };
    active: boolean;
}

export type IConnection = {
    connection_id: number;
    partner: ICompany;
    partner_confirmed: string;
    type: 'client' | 'supplier';
    relation_end: string | null;
}

export type IIndustry = {
    name: string;
}