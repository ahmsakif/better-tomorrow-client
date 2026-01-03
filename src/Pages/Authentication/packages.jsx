{/* --- Dynamic Package Selection Section --- */}
                                <div className='form-control mt-4'>
                                    <label className="label mb-1"><span className='label-text font-semibold'>Select Package</span></label>
                                    
                                    {/* Fetch Packages */}
                                    {(() => {
                                        // 1. Fetch data inside the render (or better, move this hook to the top of component)
                                        // Ideally, move this useQuery to the top level of your component
                                        const { data: packages = [] } = useQuery({
                                            queryKey: ['packages'],
                                            queryFn: async () => {
                                                const res = await axiosInstance.get('/packages');
                                                return res.data;
                                            }
                                        });

                                        return (
                                            <div className="flex flex-col gap-3">
                                                {packages.map((pkg) => (
                                                    <label 
                                                        key={pkg._id}
                                                        className="cursor-pointer border border-gray-200 rounded-xl p-4 flex items-center gap-4 transition-all hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/10 has-[:checked]:shadow-sm"
                                                    >
                                                        <input 
                                                            type="radio" 
                                                            value={pkg.name.toLowerCase()} // e.g., 'basic', 'standard'
                                                            className="peer hidden" 
                                                            defaultChecked={pkg.name === 'Basic'} // Default select Basic
                                                            {...register("package", { required: "Please select a package" })} 
                                                        />
                                                        
                                                        {/* Custom 'Screw Nut' Radio */}
                                                        {/* border-[6px] creates the thick ring with a white hole in the middle */}
                                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 peer-checked:border-blue-500 peer-checked:border-[6px] bg-white transition-all shrink-0"></div>
                                                        
                                                        <div className="flex-1 flex justify-between items-center">
                                                            <div>
                                                                <h3 className="font-bold text-gray-700 capitalize">{pkg.name}</h3>
                                                                <p className="text-xs text-gray-500">{pkg.employeeLimit} Employees</p>
                                                            </div>
                                                            
                                                            {/* Price Logic */}
                                                            <div className="text-right leading-tight">
                                                                {pkg.name === 'Basic' ? (
                                                                    <>
                                                                        <span className="block font-bold text-blue-600 text-sm">$0</span>
                                                                        <span className="text-[10px] text-gray-400 font-medium">1st Month Free</span>
                                                                    </>
                                                                ) : (
                                                                    <p className="font-bold text-gray-600 text-sm">
                                                                        ${pkg.price} <span className="text-[10px] font-normal text-gray-400">/month</span>
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        );
                                    })()}
                                    
                                    {submittedStep === 2 && errors.package && <span className='text-red-500 text-sm mt-2'>{errors.package.message}</span>}
                                </div>