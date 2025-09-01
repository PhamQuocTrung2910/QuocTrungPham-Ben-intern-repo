// ============================================================================
// AXIOS CONFIGURATION REQUIREMENTS IMPLEMENTATION
// ============================================================================

import { useState, useRef } from 'react';

// Note: In Claude.ai artifacts, localStorage is not available, so we'll use React state
// to simulate token storage functionality

// Utility function to generate unique request IDs
const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Mock axios implementation for demonstration
const mockAxios = {
  create: config => ({
    ...config,
    interceptors: {
      request: { use: () => {} },
      response: { use: () => {} },
    },
    get: async (url, options = {}) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      if (options.timeout && options.timeout < 1000) {
        throw { code: 'ECONNABORTED', message: 'timeout of 2000ms exceeded' };
      }

      if (url.includes('/posts/1')) {
        return {
          data: {
            id: 1,
            title: 'Sample Post',
            body: 'This is a sample post body',
            userId: 1,
          },
          status: 200,
          statusText: 'OK',
          config: options,
          headers: {},
        };
      } else if (url.includes('/posts')) {
        return {
          data: Array.from({ length: 5 }, (_, i) => ({
            id: i + 1,
            title: `Post ${i + 1}`,
            body: `Body of post ${i + 1}`,
            userId: i + 1,
          })),
          status: 200,
          statusText: 'OK',
          config: options,
          headers: {},
        };
      }
    },
    post: async (url, data, options = {}) => {
      await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay

      return {
        data: { id: 101, ...data },
        status: 201,
        statusText: 'Created',
        config: options,
        headers: {},
      };
    },
  }),
  isCancel: error => error && error.name === 'AbortError',
};

const AxiosDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [currentToken, setCurrentToken] = useState('');
  const [postData, setPostData] = useState({
    title: 'Test Post with Auth',
    body: 'This is a test post sent with authentication headers',
    userId: 1,
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const abortControllerRef = useRef(null);

  // Simulate token management (replacing localStorage)
  const getAuthToken = () => currentToken;
  const setAuthToken = token => setCurrentToken(token);
  const removeAuthToken = () => setCurrentToken('');

  // REQUIREMENT 1: "A base URL for API requests"
  // REQUIREMENT 2: "Default headers (including accept: "*/*" and a dynamically generated request ID)"
  // REQUIREMENT 3: "Request timeouts to prevent hanging requests"
  const apiClient = mockAxios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // ✅ Base URL requirement
    timeout: 10000, // ✅ Request timeout requirement (10 seconds)
    headers: {
      accept: '*/*', // ✅ Required accept header
      'Content-Type': 'application/json',
      'User-Agent': 'React-Axios-Demo/1.0',
    },
  });

  // Function to add logs with timestamp
  const addLog = message => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-7), `[${timestamp}] ${message}`]);
  };

  // Simulate request interceptor behavior
  const simulateRequestInterceptor = config => {
    // ✅ Dynamic request ID generation
    const requestId = generateRequestId();
    const timestamp = new Date().toISOString();

    // ✅ Retrieve and attach authentication token
    const token = getAuthToken();
    const headers = {
      ...config.headers,
      'X-Request-ID': requestId,
      'X-Timestamp': timestamp,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log(
        `🔐 Auth token attached to request: ${token.substring(0, 10)}...`
      );
    } else {
      console.log('🔓 No auth token found, proceeding without authentication');
    }

    console.log(`📤 Outgoing Request:`, {
      method: config.method?.toUpperCase() || 'GET',
      url: apiClient.baseURL + config.url,
      requestId: requestId,
      hasAuth: !!token,
      headers: headers,
      timeout: config.timeout || apiClient.timeout,
    });

    return { ...config, headers };
  };

  // Simulate response interceptor behavior
  const simulateResponseInterceptor = (response, config) => {
    console.log(`📥 Response Received:`, {
      status: response.status,
      statusText: response.statusText,
      requestId: config.headers['X-Request-ID'],
      responseTime: `${Date.now() - new Date(config.headers['X-Timestamp']).getTime()}ms`,
      dataSize: JSON.stringify(response.data).length + ' bytes',
    });

    // ✅ Handle redirect responses
    if (response.status >= 300 && response.status < 400) {
      console.log('🔄 Redirect response detected:', response.headers.location);
    }

    return response;
  };

  // Simulate login to get auth token
  const simulateLogin = async () => {
    try {
      setLoading(true);
      addLog('🔐 Simulating login...');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate fake token
      const fakeToken = `tok_${Date.now()}_${Math.random().toString(36).substr(2, 12)}`;

      // Store token
      setAuthToken(fakeToken);
      addLog('✅ Login successful, token stored');
    } catch (error) {
      addLog(`❌ Login failed: ${error.message || 'Unknown error'}`);
      setError('Login simulation failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout and remove token
  const logout = () => {
    removeAuthToken();
    addLog('🚪 Logged out, token removed');
  };

  // REQUIREMENT 8: "Sends a POST request to an endpoint with parameters"
  // REQUIREMENT 9: "Handles the response and redirects if necessary"
  const testAuthenticatedPost = async () => {
    try {
      setLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();
      addLog('📤 Sending authenticated POST request...');

      // Simulate interceptors
      const config = simulateRequestInterceptor({
        method: 'POST',
        url: '/posts',
        headers: {
          'X-Custom-Header': 'PostRequest',
          'X-Client-Version': '1.0.0',
        },
        params: {
          source: 'axios-demo',
          timestamp: Date.now(),
        },
      });

      // ✅ POST request with parameters and authentication
      const response = await apiClient.post('/posts', postData, {
        signal: abortControllerRef.current.signal,
        ...config,
      });

      simulateResponseInterceptor(response, config);

      setData({ type: 'authenticated-post', data: response.data });
      addLog('✅ Authenticated POST successful');

      // ✅ Response handling and redirect logic
      if (response.status === 201) {
        addLog('🎉 Resource created successfully');

        if (response.data.id) {
          setShouldRedirect(true);
          addLog(`🔄 Redirect suggested to /posts/${response.data.id}`);
        }
      }
    } catch (err) {
      handleRequestError(err, 'authenticated POST');
    } finally {
      setLoading(false);
    }
  };

  // Test POST without authentication
  const testUnauthenticatedPost = async () => {
    try {
      setLoading(true);
      setError(null);

      // Temporarily remove token for this request
      const originalToken = getAuthToken();
      removeAuthToken();

      abortControllerRef.current = new AbortController();
      addLog('📤 Sending POST without authentication...');

      const config = simulateRequestInterceptor({
        method: 'POST',
        url: '/posts',
      });

      const response = await apiClient.post(
        '/posts',
        {
          title: 'Unauthenticated Post',
          body: 'This post was sent without authentication headers',
          userId: 999,
        },
        {
          signal: abortControllerRef.current.signal,
          ...config,
        }
      );

      simulateResponseInterceptor(response, config);

      setData({ type: 'unauthenticated-post', data: response.data });
      addLog('✅ Unauthenticated POST successful');

      // Restore original token
      if (originalToken) {
        setAuthToken(originalToken);
      }
    } catch (err) {
      handleRequestError(err, 'unauthenticated POST');
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async () => {
    try {
      setLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();
      addLog('🔄 Creating new post...');

      const newPost = {
        title: 'Axios Demo Post',
        body: 'This post was created using our configured Axios instance with custom headers!',
        userId: Math.floor(Math.random() * 10) + 1,
      };

      const config = simulateRequestInterceptor({
        method: 'POST',
        url: '/posts',
      });

      const response = await apiClient.post('/posts', newPost, {
        signal: abortControllerRef.current.signal,
        ...config,
      });

      simulateResponseInterceptor(response, config);

      setData({ type: 'created', data: response.data });
      addLog('✅ Post created successfully');
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single post
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();
      addLog('🔄 Fetching single post...');

      const config = simulateRequestInterceptor({
        method: 'GET',
        url: '/posts/1',
      });

      const response = await apiClient.get('/posts/1', {
        signal: abortControllerRef.current.signal,
        ...config,
      });

      simulateResponseInterceptor(response, config);

      setData({ type: 'post', data: response.data });
      addLog('✅ Single post fetched successfully');
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch list of posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();
      addLog('🔄 Fetching list of posts...');

      const config = simulateRequestInterceptor({
        method: 'GET',
        url: '/posts',
        params: { _limit: 5 },
      });

      const response = await apiClient.get('/posts', {
        signal: abortControllerRef.current.signal,
        ...config,
      });

      simulateResponseInterceptor(response, config);

      setData({ type: 'posts', data: response.data });
      addLog(`✅ Fetched ${response.data.length} posts successfully`);
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };

  // Test timeout functionality
  const testTimeout = async () => {
    try {
      setLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();
      addLog('⏰ Testing timeout (2 second limit)...');

      const config = simulateRequestInterceptor({
        method: 'GET',
        url: '/posts/1',
        timeout: 2000,
      });

      const response = await apiClient.get('/posts/1', {
        signal: abortControllerRef.current.signal,
        timeout: 2000,
        ...config,
      });

      simulateResponseInterceptor(response, config);

      setData({ type: 'timeout-test', data: response.data });
      addLog('✅ Timeout test passed (response was fast)');
    } catch (err) {
      handleRequestError(err);
    } finally {
      setLoading(false);
    }
  };

  // Centralized error handling with auth-specific logic
  const handleRequestError = (err, requestType = 'request') => {
    if (mockAxios.isCancel(err)) {
      addLog(`🚫 ${requestType} was cancelled`);
      setError('Request was cancelled');
    } else if (err.code === 'ECONNABORTED') {
      addLog(`⏰ ${requestType} timed out`);
      setError('Request timed out');
    } else if (err.response?.status === 401) {
      addLog(`🔐 ${requestType} failed: Unauthorized`);
      setError('Authentication required or token expired');
      logout();
    } else if (err.response?.status === 403) {
      addLog(`🚫 ${requestType} failed: Forbidden`);
      setError('Insufficient permissions');
    } else {
      addLog(`❌ ${requestType} failed: ${err.message}`);
      setError(err.message);
    }
  };

  // Cancel current request
  const cancelRequest = () => {
    if (abortControllerRef.current && loading) {
      abortControllerRef.current.abort('Cancelled by user');
      addLog('🛑 Request cancelled by user');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Axios Instance Configuration
      </h2>

      {/* Authentication Section */}
      <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <h3 className="font-semibold text-black mb-3">
          🔐 Authentication Management
        </h3>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="text-black text-sm">
            <strong>Token Status:</strong>{' '}
            {currentToken ? '✅ Active' : '❌ None'}
          </div>
          {currentToken && (
            <div className="text-black text-xs font-mono bg-gray-100 px-2 py-1 rounded">
              {currentToken.substring(0, 20)}...
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={simulateLogin}
            disabled={loading || currentToken}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded transition-colors"
          >
            Simulate Login
          </button>
          <button
            onClick={logout}
            disabled={!currentToken}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* POST Request Testing */}
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-black mb-3">
          📤 POST Request Testing
        </h3>

        {/* Post Data Configuration */}
        <div className="mb-4 p-3 bg-white border border-gray-200 rounded">
          <h4 className="font-medium text-black mb-2">Request Payload:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Post title"
              value={postData.title}
              onChange={e =>
                setPostData({ ...postData, title: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded text-black text-sm"
            />
            <input
              type="text"
              placeholder="Post body"
              value={postData.body}
              onChange={e => setPostData({ ...postData, body: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded text-black text-sm"
            />
            <input
              type="number"
              placeholder="User ID"
              value={postData.userId}
              onChange={e =>
                setPostData({ ...postData, userId: parseInt(e.target.value) })
              }
              className="px-3 py-2 border border-gray-300 rounded text-black text-sm"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={testAuthenticatedPost}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded transition-colors"
          >
            POST with Auth
          </button>
          <button
            onClick={testUnauthenticatedPost}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white rounded transition-colors"
          >
            POST without Auth
          </button>
        </div>

        {/* Redirect Status */}
        {shouldRedirect && (
          <div className="mt-3 p-3 bg-blue-100 border border-blue-300 rounded">
            <div className="text-black text-sm">
              🔄 <strong>Redirect Triggered:</strong> In a real app, you would
              navigate to the new resource page
            </div>
            <button
              onClick={() => setShouldRedirect(false)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Basic API Testing Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
        <button
          onClick={fetchPost}
          disabled={loading}
          className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          GET Single Post
        </button>

        <button
          onClick={fetchPosts}
          disabled={loading}
          className="px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          GET Posts List
        </button>

        <button
          onClick={createPost}
          disabled={loading}
          className="px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          Create Post
        </button>

        <button
          onClick={testTimeout}
          disabled={loading}
          className="px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          Test Timeout
        </button>

        <button
          onClick={cancelRequest}
          disabled={!loading}
          className="px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
        >
          Cancel Request
        </button>
      </div>

      {/* Status Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Response Data */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-black mb-3">📡 Response Data</h3>

          {loading && (
            <div className="text-center p-4">
              <div className="text-blue-600 font-medium">Loading...</div>
              <div className="text-sm text-gray-600 mt-1">
                Check console for request details
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
              <strong>Error:</strong> {error}
            </div>
          )}

          {data && !loading && (
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <div className="text-black text-sm mb-2">
                <strong>Type:</strong> {data.type}
              </div>
              <div className="bg-black text-green-400 p-3 rounded font-mono text-xs max-h-48 overflow-y-auto">
                {JSON.stringify(data.data, null, 2)}
              </div>
            </div>
          )}
        </div>

        {/* Activity Logs */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-black mb-3">📝 Activity Logs</h3>
          <div className="bg-black text-green-400 p-3 rounded font-mono text-xs max-h-48 overflow-y-auto">
            {logs.length === 0 ? (
              <div>No activity yet... Click a button to start!</div>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-black mb-2">
          🧪 Testing the Enhanced Axios Configuration:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black text-sm">
          <div>
            <strong>Authentication Testing:</strong>
            <ol className="list-decimal list-inside mt-1 space-y-1">
              <li>Click &quot;Simulate Login&quot; to get auth token</li>
              <li>
                Try &quot;POST with Auth&quot; - check console for Bearer token
              </li>
              <li>Try &quot;POST without Auth&quot; - no token attached</li>
              <li>Check console for Authorization headers</li>
            </ol>
          </div>
          <div>
            <strong>Advanced Features:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Dynamic request IDs in X-Request-ID header</li>
              <li>Request parameters and custom headers</li>
              <li>Response-based redirect logic</li>
              <li>Timeout and cancellation testing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-black mb-2">
          ✅ Axios Features Implemented:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black text-sm">
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Base URL:</strong> JSONPlaceholder API
            </li>
            <li>
              <strong>Accept Header:</strong> &quot;*/*&quot; as required
            </li>
            <li>
              <strong>Dynamic Request ID:</strong> Auto-generated unique IDs
            </li>
            <li>
              <strong>Request Timeout:</strong> 10 seconds default
            </li>
          </ul>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Auth Token:</strong> Retrieved from storage & attached
            </li>
            <li>
              <strong>POST Requests:</strong> With parameters & custom headers
            </li>
            <li>
              <strong>Response Handling:</strong> Redirect logic included
            </li>
            <li>
              <strong>Error Handling:</strong> 401/403 auth error management
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AxiosDemo;
