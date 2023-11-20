import React from 'react'
import Spinner from '../components/Spinner'
import SubjectCard from '../components/SubjectCard/SubjectCard'


export default function Home() {

    let loading = false

    return (
        <div className="py-5 px-10 w-full ">
            <h1 className="title"> Liste des cartes publiques</h1>
            {loading && (
                <div className="flex justify-center items-center">
                    <Spinner width={8} height={8} />
                </div>
            )}
            {!loading && (
                <div className="px-10 w-full ">
                    {/* {cardsData.map((subjectId) => <SubjectCard subjectId={subjectId} key={subjectId} />)} */}
                </div>
            )}
        </div>
    )
}
