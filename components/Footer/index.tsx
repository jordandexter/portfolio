"use client"

export default function Footer() {
    return (
        <div className="flex w-full justify-center py-6 flex-col items-center bg-section-background-dark px-3 md:px-0">
            <div className="flex w-full flex-col max-w-250 justify-center gap-5">
                <div className="flex w-full justify-between">
                    <p className="text-white/40"
                        style={{
                            fontSize: '13px'
                        }}>{new Date().getFullYear()} - Nothin' reserved</p>
                    <p className="text-white/40"
                        style={{
                            fontSize: '13px'
                        }}>Built with <span className="text-primary">Next.js</span> + <span className="text-primary">React</span></p>
                </div>
            </div>
        </div>
    )
}
