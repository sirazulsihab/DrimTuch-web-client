"use client"; // যদি Next.js app router ব্যবহার করো

import { useEffect, useState } from "react";

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch FAQs
  const fetchFaqs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/faqs");
      const data = await res.json();
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  // Add FAQ
  const handleAddFaq = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/api/faqs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question, answer }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("FAQ Added!");
        setQuestion("");
        setAnswer("");
        fetchFaqs();
      } else {
        alert(data.message || "Failed to add FAQ");
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
    }
    setLoading(false);
  };

  // Delete FAQ
  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this FAQ?")) return;
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/api/faqs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        alert("FAQ Deleted!");
        fetchFaqs();
      } else {
        alert(data.message || "Failed to delete FAQ");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">FAQ Management</h2>

      {/* Add FAQ Form */}
      <form
        onSubmit={handleAddFaq}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h3 className="text-lg font-semibold mb-2">Add New FAQ</h3>
        <input
          type="text"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <textarea
          placeholder="Enter Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
          rows="3"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add FAQ"}
        </button>
      </form>

      {/* FAQ List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">All FAQs</h3>
        {faqs.length === 0 ? (
          <p>No FAQs found</p>
        ) : (
          <ul className="space-y-3">
            {faqs.map((faq) => (
              <li
                key={faq._id}
                className="border-b pb-2 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{faq.question}</p>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
