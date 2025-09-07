"use client";

import { useState, useEffect } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ title: "", price: 0 });

  // Fetch all services
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Fetch services error:", err));
  }, []);

  // Add Service
  const addService = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/services/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Service added!");
        setServices([...services, data]);
        setNewService({ title: "", price: 0 });
      } else {
        alert(data.message || "Failed to add service");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Service
  const deleteService = async (id) => {
    if (!confirm("Are you sure to delete this service?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/services/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Service deleted!");
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Services</h2>

      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Title"
          value={newService.title}
          onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
          className="border p-2 rounded"
        />
        <button onClick={addService} className="bg-yellow-500 text-black px-4 py-2 rounded">
          Add Service
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-2">{s.title}</td>
              <td className="p-2">৳ {s.price}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteService(s._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
