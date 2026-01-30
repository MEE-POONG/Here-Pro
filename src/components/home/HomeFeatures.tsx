import { Zap, BarChart, Calendar, ShieldCheck } from 'lucide-react';

export function HomeFeatures() {
    return (
        <section className="py-24 bg-white">
            <div className="container-custom">
                {/* Top Features */}
                <div className="text-center mb-16">
                    <span className="bg-gray-100 text-gray-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Features</span>
                    <h2 className="text-3xl font-bold mt-6 mb-4 text-gray-900">Smart Features at a Glance</h2>
                    <p className="text-gray-600 font-medium max-w-2xl mx-auto">Discover the intelligent tools that streamline workflows, enhance reporting, and support patient outcomes.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {[
                        { title: "Patient Overview", icon: ShieldCheck, color: "bg-green-100 text-green-600" },
                        { title: "AI Insights", icon: Zap, color: "bg-blue-100 text-blue-600" },
                        { title: "Smart Scheduling", icon: Calendar, color: "bg-orange-100 text-orange-600" },
                    ].map((feature, idx) => (
                        <div key={idx} className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
                            <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-6`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                            <p className="text-gray-700 text-sm leading-relaxed font-medium">
                                Track and analyze essential health data with cutting-edge technology.
                            </p>
                        </div>
                    ))}
                </div>

                {/* Feature Highlight 1 - Split Layout */}
                <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 mb-12">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">Analytics</span>
                            <h2 className="text-4xl font-bold mt-4 mb-6">Your Entire Practice at a Glance</h2>
                            <p className="text-gray-500 mb-8 leading-relaxed">
                                Explore our centralized dashboard. Monitor vitals, prescription records, and scheduling together in one seamless experience.
                            </p>
                            <ul className="space-y-4">
                                {['Real-time Updates', 'Secure Data Encryption', 'Multi-device Sync'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">✓</div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-3xl shadow-xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex gap-4 mb-4">
                                    <div className="w-1/2 h-32 bg-blue-50 rounded-xl"></div>
                                    <div className="w-1/2 h-32 bg-green-50 rounded-xl"></div>
                                </div>
                                <div className="h-40 bg-gray-50 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
