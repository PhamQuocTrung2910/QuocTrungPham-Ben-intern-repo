import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Profile Page
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            This is your profile page! Here you could display user information.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              User Info
            </h2>
            <div className="text-left space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> John Doe
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> john@example.com
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> Developer
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Navigate using Link:
              </h3>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Go to Home (Link)
              </Link>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Navigate using useNavigate:
              </h3>
              <button
                onClick={goToHome}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Go to Home (useNavigate)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
