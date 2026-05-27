import { useState } from 'react';
import { UserCircle } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [uname, setUname] = useState('Dr.Aditya Srivastava');
  const [pass, setPass] = useState('2028');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uname === 'Dr.Aditya Srivastava' && pass === '2028') {
      onLogin();
    } else {
      alert('Invalid credentials! Please use Dr.Aditya Srivastava / 2028');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center font-sans">
      <div className="bg-white p-8 border-t-8 border-blue-800 shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6 border-b pb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mb-4">
            <UserCircle size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">Candidate Login</h2>
          <p className="text-sm text-gray-500 mt-1">National Testing Agency (NTA)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">CANDIDATE NAME / ID</label>
            <div className="relative">
              <input
                type="text"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">PASSWORD</label>
            <div className="relative">
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-bold py-3 rounded mt-4 hover:bg-blue-800 transition-colors shadow-md"
          >
            LOGIN
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Mock NTA Interface for NEET UG CBT Practice</p>
        </div>
      </div>
    </div>
  );
}
