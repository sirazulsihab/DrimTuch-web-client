"use client";

import { useState, useEffect } from "react";

const categories = [
  { title: "অনলাইন গ্রোথ সার্ভিস", slug: "online-growth" },
  { title: "কনসালটেন্সি সার্ভিস", slug: "consultancy" },
  { title: "লোকাল বিজনেস", slug: "local-business" },
  { title: "ডিজিটাল মার্কেটিং", slug: "digital-marketing" },
  { title: "এ আই সার্ভিস", slug: "ai-services" },
  { title: "ডিজিটাল সার্ভিস", slug: "digital-services" },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    img: "",
    price: 0,
    category: categories[0].slug,
    isPopular: false,
  });

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or Update Service
  const saveService = async () => {
    try {
      const url = editingService
        ? "http://localhost:5000/api/admin/services/update"
        : "http://localhost:5000/api/admin/services/add";

      const body = editingService
        ? { ...form, serviceId: editingService._id }
        : form;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        alert(editingService ? "Service updated!" : "Service added!");
        setForm({
          title: "",
          description: "",
          img: "",
          price: 0,
          category: categories[0].slug,
          isPopular: false,
        });
        setEditingService(null);
        fetchServices();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Service
  const editService = (service) => {
    setEditingService(service);
    setForm({
      title: service.title,
      description: service.description,
      img: service.img,
      price: service.price,
      category: service.category,
      isPopular: service.isPopular,
    });
  };

  // Delete Service
  const deleteService = async (id) => {
    if (!confirm("Are you sure to delete this service?")) return;
    try {
      const res = await fetch("http://localhost:5000/api/admin/services/delete", {
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

      {/* Form */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={form.img}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full col-span-2"
        />
        <label className="flex items-center space-x-2 col-span-2">
          <input
            type="checkbox"
            name="isPopular"
            checked={form.isPopular}
            onChange={handleChange}
          />
          <span>Mark as Popular</span>
        </label>
        <button
          onClick={saveService}
          className="bg-yellow-500 text-black px-4 py-2 rounded col-span-2"
        >
          {editingService ? "Update Service" : "Add Service"}
        </button>
      </div>

      {/* Service Table */}
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th className="p-2">Title</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Popular</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-2">{s.title}</td>
              <td className="p-2">{s.category}</td>
              <td className="p-2">৳ {s.price}</td>
              <td className="p-2">{s.isPopular ? "✅" : "❌"}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => editService(s)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
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
