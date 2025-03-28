import { useState, useEffect } from "react";
import supabase from "../supabaseClient"; // Ensure this is correctly configured

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch All Doctors
  const fetchDoctors = async () => {
    try {
      const { data, error } = await supabase.from("doctors").select("*");
      if (error) throw error;

      console.log("Fetched Doctors:", data); // Log fetched data
      setDoctors(data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching doctors:", err.message);
      setError(err.message);
    }
  };

  // Fetch All Appointments
  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase.from("appointments").select("*");
      if (error) throw error;

      console.log("Fetched Appointments:", data); // Log fetched data
      setAppointments(data); // Update state with fetched data
    } catch (err) {
      console.error("Error fetching appointments:", err.message);
      setError(err.message);
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDoctors();
      await fetchAppointments();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading data...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Appointments</h2>

      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg">
                {appointment.doctor_name || "Doctor"}
              </h3>
              <p className="text-gray-600">
                Scheduled:{" "}
                {new Date(appointment.appointment_time).toLocaleString()}
              </p>
              <p className="text-gray-600">Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">No appointments found.</p>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-6 text-center">Doctors</h2>

      {doctors.length > 0 ? (
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold text-lg">{doctor.name}</h3>
              <p className="text-gray-600">Specialization: {doctor.specialization}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">No doctors found.</p>
      )}
    </div>
  );
};

export default AppointmentsList;
