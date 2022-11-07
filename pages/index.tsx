import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Logo } from '../components/logo'
import { MapMenuButton } from '../components/map_menu_button'
import { CompanyInfo } from '../layout/company_info'
import { MapView } from '../layout/map'
import { SearchCompany } from '../layout/search_company'
import { MdAutoGraph, MdMenu, MdPersonOutline } from 'react-icons/md'
import { FilterCompany } from '../components/filter_company'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function Home() {
  const [companyInfoVisible, setCompanyInfoVisible] = useState(false)
  const [activeMarker, setActiveMarker] = useState<number | null>(null)

  return (
    <div className='bg-red-50 h-screen'>
      <Head>
        <title>supply.us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='fixed left-2 top-2 z-50'>
        <SearchCompany setCompanyInfoVisible={setCompanyInfoVisible.bind(true, true)} />
      </div>
      <div className='fixed left-100 top-2 z-20 pl-2 flex items-center'>
        <FilterCompany placeholder='Filter by industry' />
        <div className="mx-4">
          <FilterCompany placeholder='Filter by offers' />
        </div>
        <FilterCompany placeholder='Filter by needs' />
      </div>
      <div className='fixed right-2 top-2 z-50'>
        <Logo />
      </div>
      <CompanyInfo visible={true} activeMarker={activeMarker} />
      <MapView activeMarker={activeMarker} setActiveMarker={setActiveMarker} setCompanyInfoVisible={setCompanyInfoVisible.bind(true, !companyInfoVisible)} />
      <div className='fixed bottom-0 right-0 pb-5 flex flex-row items-center z-50'>
        <MapMenuButton icon={<MdAutoGraph />} />
        <MapMenuButton icon={<MdPersonOutline />} />
        <MapMenuButton icon={<MdMenu />} />
      </div>
    </div>
  )
}