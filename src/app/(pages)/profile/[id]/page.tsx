import { options } from '@/app/api/auth/[...nextauth]/options'
import { PageTitle } from '@/components/common/page-title'
import { getServerSession } from 'next-auth'
import React from 'react'
import { ButtonBack } from './_components/button-back'
import { getProfile } from './_actions/get-profile'
import { redirect } from 'next/navigation'
import { RecentRatings } from './_components/recent-ratings'
import { RatingWithBookAndCategories } from './_components/recent-rating-card'
import { ProfileDetalis } from './_components/profile-detalis'

export interface ProfileDataTypes {
  profile: {
    user: {
      id: string
      image: string
      name: string
      member_since: string
    }
    ratings: RatingWithBookAndCategories[]
    readPages: number
    ratedBooks: number
    readAuthors: number
    mostReadCategory?: string
  }
}

interface ProfilePageProps {
  params: {
    id?: string
  }
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { profile }: ProfileDataTypes = await getProfile(params?.id as string)
  const session = await getServerSession(options)

  if (params.id !== profile.user.id) {
    redirect('/')
  }

  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 pr-3 xl:pr-0 w-full h-full gap-16 ">
        <section className="col-span-2 w-full overflow-auto no-scrollbar pb-5 flex flex-col gap-11">
          {params.id === session?.user.id ? (
            <PageTitle title="Perfil" />
          ) : (
            <ButtonBack />
          )}

          <RecentRatings ratings={profile.ratings} />
        </section>

        <ProfileDetalis profile={profile} />
      </div>
    </main>
  )
}

export default ProfilePage
