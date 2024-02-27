import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

function Main() {
    return (
        <React.Fragment>
            <main className="text-[#ffffff] text-center" style={{marginTop: '3rem'}}>

                <section className="bg-[#1c2431]">
                    <div className="relative">

                        <h1 className="text-[1.6rem] pb-4 relative z-10">All your Tasks in one secure location, accessible anywhere.</h1>
                    </div>

                    <div className="bg-[#181f2a] px-5 pb-6 relative top-[-4.4rem]">
                        <p className=" text-[0.9rem] w-[18.8rem] pt-[4.5rem] pb-4 m-auto">Tmanager stores all your most important Tasks in one secure location. Access them wherever
                            you need
                        </p>
                        <Button variant='contained'><Link style={{color: 'white', textDecoration: 'none'}} to='/tasks/add-task'>Get Started</Link></Button>
                    </div>

                </section>


            </main>
        </React.Fragment>
    )
}

export default Main
