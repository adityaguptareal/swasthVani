import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            We are dedicated to providing innovative healthcare solutions to improve lives.
          </p>
        </motion.div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Johnson",
              role: "Cardiologist",
              image: "https://source.unsplash.com/300x300/?doctor",
            },
            {
              name: "Dr. Michael Lee",
              role: "Neurologist",
              image: "https://source.unsplash.com/300x300/?medical",
            },
            {
              name: "Dr. Emily Davis",
              role: "Pediatrician",
              image: "https://source.unsplash.com/300x300/?healthcare",
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-blue-800">
                {member.name}
              </h3>
              <p className="text-gray-500">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Section */}
        <motion.div
          className="mt-16 bg-white rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At SwasthVani, our mission is to revolutionize healthcare by
            leveraging technology to provide accessible, efficient, and
            personalized medical solutions. We believe in empowering patients
            and healthcare professionals with tools that make a difference.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;