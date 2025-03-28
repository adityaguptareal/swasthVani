import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, doctors(name, specialization)");

      if (error) {
        console.error("Error fetching appointments:", error.message);
      } else {
        setAppointments(data);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Appointments</h2>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="font-bold">{appointment.doctors.name}</h3>
            <p>Specialization: {appointment.doctors.specialization}</p>
            <p>Status: {appointment.status}</p>
          </div>
        ))
      ) : (
        <p className="text-center">No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsList;
