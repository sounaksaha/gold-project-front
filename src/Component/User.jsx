import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change this based on your preference
  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/customers");
        const response1 = await fetch('http://localhost:8080/api/customers/total');

        const total = await response1.json();
        setTotalCustomers(total);
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }

        const data = await response.json();
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen flex flex-col">
      <div class="container px-6 py-8 mx-auto">
        <h3 class="text-3xl font-medium text-gray-700">Customer Details</h3>

        <div class="mt-4">
          <div class="flex flex-wrap -mx-6">
            <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
              <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <svg
                    class="w-8 h-8 text-white"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>

                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">{totalCustomers}</h4>
                  <div class="text-gray-500">Total Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8"></div>

        <div class="flex flex-col mt-8">
          <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table class="min-w-full">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Name
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Phone No
                    </th>
                    {/* <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Email
                    </th> */}
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Address
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Gender
                    </th>
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Age
                    </th>
                    {/* <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Pincode
                    </th> */}
                    <th class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Action
                    </th>
                    {/* <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th> */}
                  </tr>
                </thead>

                <tbody class="bg-white">
                {loading ? (
                    <tr>
                        <td colSpan="8">Loading...</td>
                    </tr>
                ) : (
                  currentItems.map((customer, index) => (
                  <tr key={index}>
                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="flex items-center">
                        
                      <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                  <svg
                    class="w-8 h-8 text-white"
                    viewBox="0 0 28 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>

                        <div class="ml-4">
                          <div class="text-sm font-medium leading-5 text-gray-900">
                            {customer.fullName}{"  "}({customer.gender})
                          </div>
                          <div class="text-sm leading-5 text-gray-500">
                          {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="text-sm leading-5 text-gray-900">
                      {customer.phoneNo}
                      </div>
                      
                    </td>

                    {/* <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      {customer.email}
                      </span>
                    </td> */}

                    <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div class="flex items-center">
                       

                        <div class="ml-4">
                          <div class="text-sm font-medium leading-5 text-gray-900">
                            {customer.address}
                          </div>
                          <div class="text-sm leading-5 text-gray-500">
                          {customer.pincode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    {customer.gender}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    {customer.age}
                    </td>
                    {/* <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                    {customer.pincode}
                    </td> */}

                    <td class="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                      <Link to={`/dashboard/user/${customer.phoneNo}`} class="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300">
                        View
                      </Link>
                      {/* <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      
                    </a> */}
                    </td>
                  </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ul class="inline-flex -space-x-px text-base h-10">
            {Array.from({ length: Math.ceil(customers.length / itemsPerPage) }).map((_, index) => (
              <li
                key={index}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-300 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-50 dark:bg-gray-300 dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-whiter ${
                  currentPage === index + 1 ? "bg-gray-900" : ""
                }`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
