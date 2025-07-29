
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PackagesSection from "../components/PackagesSection";
import TourGuidesSection from "../components/TourGuidesSection";

const Home = () => {
    return (
        <div>
         <section
                className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: "url('https://i.ibb.co/twS14HHb/giau-tran-ZMd-Xvd6j-Gww-unsplash.jpg')",
                }}
            >
                {/* Overlay */}
                {/* <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-10"></div> */}

                {/* Content */}
                <motion.div
                    className="text-center text-white z-20 p-4"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Explore Bangladesh
                    </h1>
                    <p className="text-xl md:text-2xl mb-6">
                        Discover the hidden beauty of our land
                    </p>
                    <Link
                        to="/trips"
                        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg"
                    >
                        View Trips
                    </Link>
                </motion.div>
            </section>

            {/* Website Overview Section */}
            <section className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold mb-4 text-center">Why Choose Us?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <video
                            controls
                            className="rounded shadow"
                            src="https://www.w3schools.com/html/mov_bbb.mp4"
                        ></video>
                    </div>
                    <div className="flex flex-col justify-center">
                        <p className="text-lg mb-4">
                            The Tourist Guide is your one-stop travel platform for discovering the best of Bangladesh. From famous destinations to hidden gems — we have it all. Plan, book, and explore with ease.
                        </p>
                        <ul className="list-disc list-inside text-md">
                            <li>Verified tour guides</li>
                            <li>Flexible booking system</li>
                            <li>Community stories from real travelers</li>
                            <li>Easy payment and refund policy</li>
                            <li>All in one dashboard</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-3xl font-bold mb-4 text-center">Tourism & Travel Guide</h2>
                <Tabs>
                    <TabList className="flex justify-center space-x-8 border-b-2 border-gray-300 mb-8">
                        <Tab className="cursor-pointer py-2 px-4 font-semibold text-gray-700 hover:text-green-700">
                            Our Packages
                        </Tab>
                        <Tab className="cursor-pointer py-2 px-4 font-semibold text-gray-700 hover:text-green-700">
                            Meet Our Tour Guides
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <PackagesSection />
                    </TabPanel>
                    <TabPanel>
                        <TourGuidesSection />
                    </TabPanel>
                </Tabs>
            </section>

            {/* Tourist Stories Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Tourist Stories</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-700 mb-2">“Amazing experience in Cox's Bazar!”</p>
                            <p className="text-sm text-gray-500">- Alex, Jan 2024</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-700 mb-2">“Sundarbans trip was thrilling.”</p>
                            <p className="text-sm text-gray-500">- Maria, Feb 2024</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-700 mb-2">“Loved the people and food!”</p>
                            <p className="text-sm text-gray-500">- John, Mar 2024</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-700 mb-2">“Definitely coming back again.”</p>
                            <p className="text-sm text-gray-500">- Sara, May 2024</p>
                        </div>
                    </div>
                    <div className="text-center mt-6">
                        <Link to="/community" className="text-blue-600 underline text-lg">
                            View All Stories
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
