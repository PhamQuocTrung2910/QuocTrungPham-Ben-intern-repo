import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Home Page
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            This is the home page of your React Router application!
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Navigate using Link:
              </h3>
              <Link
                to="/profile"
                className="inline-block px-6 py-3 bg-white hover:bg-black text-black font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Go to Profile (Link)
              </Link>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Navigate using useNavigate:
              </h3>
              <button
                onClick={goToProfile}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Go to Profile (useNavigate)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
