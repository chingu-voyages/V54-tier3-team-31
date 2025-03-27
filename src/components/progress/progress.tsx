'use client'

// import { useState } from 'react'
import NavigationMenu from '../navigation/navigation-menu'
import DesktopNav from '../navigation/desktop-nav'

const Progress = () => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Desktop Navigation */}
            <DesktopNav />

            {/* Main Container */}
            <div>
                <h2>Progress Page</h2>
            </div>

            {/*Mobile-only Navigation*/}
            <div className="md:hidden">
                <NavigationMenu />
            </div>
        </div>
    )
}

export default Progress
