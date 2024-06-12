// Define the dummy data inside the function to avoid scope issues
export const getSubscribers = async () => {
    const dummySubscribers = [
      {
        id: 1,
        name: "Ryan Katayi",
        email: "ryan@example.com",
        status: "Active",
        subscribedOn: "2024-06-01",
        amount: "$3",
      },
      {
        id: 2,
        name: "Munyaradzi Makosa",
        email: "munyaradzi@example.com",
        status: "Active",
        subscribedOn: "2024-06-01",
        amount: "$3",
      },
    ];
  
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/subscribers');
      if (!response.ok) throw new Error('Failed to fetch subscribers');
      return await response.json();
    } catch (error) {
      console.warn("Failed to fetch data from server, using dummy data:", error);
      // Return dummy data if the server fetch fails
      return dummySubscribers;
    }
  };
  