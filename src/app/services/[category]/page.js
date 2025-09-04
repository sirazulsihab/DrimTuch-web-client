async function getServices(category) {
    // এখানে পরে আপনার Express.js API থেকে ডেটা কল করবেন
    // উদাহরণ: const res = await fetch(`${process.env.API_URL}/services?category=${category}`);
    // return res.json();
  
    // ডেমো ডাটা
    return [
      { id: 1, name: "Facebook Marketing", price: "৳5000" },
      { id: 2, name: "YouTube Marketing", price: "৳7000" },
    ];
  }
  
  export default async function CategoryPage({ params }) {
    const { category } = params;
    const services = await getServices(category);
  
    return (
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 capitalize">{category} Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{srv.name}</h3>
              <p className="text-gray-700 mb-4">Price: {srv.price}</p>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg transition">
                অর্ডার করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  