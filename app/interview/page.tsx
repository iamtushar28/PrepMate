import React from 'react'
import InterviewNavbar from './components/InterviewNavbar'
import InterviewHome from './components/InterviewHome'

type Props = {}

const page = (props: Props) => {
    return (
        <section className="min-h-screen h-auto w-full">
            <InterviewNavbar />
            <InterviewHome />
        </section>
    )
}

export default page