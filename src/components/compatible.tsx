const data = [
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M64 384h384v-42.67H64Zm0-106.67h384v-42.66H64ZM64 128v42.67h384V128Z"/></svg>,
        body: "Our survey platform integrates seamlessly with tools for data analysis, CRM systems, email marketing, and collaboration, including analytics dashboards and third-party data platforms.",
        header: "Wide range of integrations"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="m144.938 18.063l8.437 19.187c17.36 39.43 27.86 79.965 32.563 120.313c-50.01 4.028-99.724 4.15-144.688 1.656l-21.188-1.19L33.5 174.438c42.232 51.6 93.612 82.498 148.438 110.907c-12.137 69.664-39.726 134.1-77.282 185.312L92 487.906l21.25-2.437c99.754-11.457 177.9-51.146 236.688-106.064c33.06 23.513 65.993 52.01 98.093 88.97l15.095 17.374l1.28-22.97c3.558-63.803-8.63-128.11-33.655-187.53c37.76-67.647 57.985-143.224 63.563-214.656l2-25.532l-17.97 18.22c-35.647 36.18-86.34 61.284-143.468 78.124c-46.935-47.74-104.638-85.32-170.03-106.812l-19.907-6.532zm82.75 65.312c10.37.018 23.587 4.884 39.312 14.47a424 424 0 0 1 46.813 39.31c-35.065 8.896-72.027 14.882-109.188 18.626a443 443 0 0 0-3.938-26.624c-.003-.02.004-.042 0-.062c-.856-30.68 8.666-45.75 27-45.72zm183.062 46.688c30.66-.583 46.988 17.807 38.875 56.343c-7.78 22.997-17.28 45.628-28.594 67.47a461.8 461.8 0 0 0-71.436-106.75c12.818-4.06 25.32-8.585 37.437-13.564c8.605-2.196 16.553-3.363 23.72-3.5zm-81.313 22.968c33.327 35.83 60.508 77.187 80.282 121.47c-9.032 15.405-19.007 30.317-30 44.563c-7.257 9.4-15.006 18.48-23.158 27.25c-21.106-6.102-43.19-14.988-60.812-23c-.074-.034-.144-.06-.22-.094c-19.852-11.155-39.46-21.245-58.624-30.908c-11.675-5.886-22.84-11.594-34.125-17.343c4.355-30.108 5.87-61.04 4.126-92.283c25.76-7.15 54.416-13.28 78.313-19.25c14.972-2.99 29.75-6.43 44.217-10.406zm-39.843 32.657q-1.27-.004-2.5.063c-6.556.363-12.224 2.22-16.813 5.125c-9.177 5.81-15.155 16.127-15.155 32.063c0 31.87 28.156 70.8 61 82.812c16.422 6.007 29.822 4.435 39-1.375s15.156-16.127 15.156-32.063c0-31.87-28.124-70.767-60.967-82.78c-7.185-2.63-13.79-3.828-19.72-3.845zm-101.22 2.532c1.17 26.25-.064 52.25-3.374 77.686c-8.285-4.346-16.454-8.732-24.47-13.25c-45.842-30.138-18.07-49.58 27.845-64.437zm11.095 106.03c9.662 4.89 19.185 9.8 29 14.75c34.664 17.48 70.195 36.024 105.686 59.625a374 374 0 0 1-20.937 17.78c-66.568 32.47-115.528 2.77-118.25-70.78a483 483 0 0 0 4.5-21.375zm219.124 1.53a429 429 0 0 1 10.344 30.283c3.064 27.392-20.972 31.225-51.75 25.312a394 394 0 0 0 17.312-20.875c8.65-11.207 16.628-22.84 24.094-34.72"/></svg>,
        body: "Create surveys with customizable question types, logic flows, and response options to suit academic research, market research, or internal feedback collection.",
        header: "Flexible survey configuration"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m14 12l-2 2l-2-2l2-2zm-2-6l2.12 2.12l2.5-2.5L12 1L7.38 5.62l2.5 2.5zm-6 6l2.12-2.12l-2.5-2.5L1 12l4.62 4.62l2.5-2.5zm12 0l-2.12 2.12l2.5 2.5L23 12l-4.62-4.62l-2.5 2.5zm-6 6l-2.12-2.12l-2.5 2.5L12 23l4.62-4.62l-2.5-2.5z"/></svg>,
        body: "Leverage our flexible API to integrate surveys into your existing applications, automate data collection, and build tailored research workflows specific to your organization.",
        header: "API for custom solutions"
    },
    {
        icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 5.5a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m-3.6 13.9l1-4.4l2.1 2v6h2v-7.5l-2.1-2l.6-3A7.3 7.3 0 0 0 22 13v-2c-1.76.03-3.4-.89-4.3-2.4l-1-1.6c-.36-.6-1-1-1.7-1c-.3 0-.5.1-.8.1L9 8.3V13h2V9.6l1.8-.7l-1.6 8.1l-4.9-1l-.4 2zM4 9a1 1 0 0 1-1-1a1 1 0 0 1 1-1h3v2zm1-4a1 1 0 0 1-1-1a1 1 0 0 1 1-1h5v2zm-2 8a1 1 0 0 1-1-1a1 1 0 0 1 1-1h4v2z"/></svg>,
        body: "Launch surveys in minutes, not days. Quickly design, distribute, and start collecting responses with minimal configuration.",
        header: "Fast setup"
    },
]

function Compatible() {
    return ( 
        <div className="flex bg-custom-grey py-15 px-10">
            <div className="w-full">
                <h2 className="font-semibold text-3xl font-zalando-expanded">Compatible with <br /> your business</h2>
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col mt-6 text-sm pr-10">
                                <div className="flex items-start gap-2 justify-start">
                            <span>
                                {item.icon}
                            </span>
                            <div className="font-poppins">
                                <h3 className="font-semibold">{item.header}</h3>
                                <p>
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
                }
                
            </div>
            <div className="w-full">

            </div>
        </div>
     );
}

export default Compatible;