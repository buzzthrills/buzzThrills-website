import React, { useEffect, useState } from "react";
import { User, CalendarCheck, Phone, Package, Edit2 } from "lucide-react";
import { apiRequest } from "../utils/apiRequest";

type UserType = {
  fullName: string;
  email: string;
  createdAt: string;
};

type StatsType = {
  totalBookings: number;
  peopleCalled: number;
  currentPackage: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [stats, setStats] = useState<StatsType | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  // Load profile photo from localStorage
  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) setPhoto(savedPhoto);
  }, []);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("auth-token");

      const res = await apiRequest("/user_dashboard/my_profile", {
        method: "POST",
        body: { token },
      });

      if (res.success) {
        setUser(res.data.user);
        setStats(res.data.stats);
        setName(res.data.user.fullName);
      }
    };

    fetchProfile();
  }, []);

  // Update name
  const updateName = async () => {
    const token = localStorage.getItem("token");

    const res = await apiRequest("/user_dashboard/update-name", {
      method: "POST",
      body: { token, fullName: name },
      showSuccess: true,
    });

    if (res.success) {
      setUser(res.data.user);
      setEditing(false);
    }
  };

  // Upload photo (localStorage only)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePhoto", reader.result as string);
      setPhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  if (!user || !stats) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white shadow-xl rounded-3xl p-6">
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-500 bg-purple-200">
          {photo ? (
            <img src={photo} className="w-full h-full object-cover" />
          ) : (
            <User size={40} className="text-purple-500 mx-auto mt-10" />
          )}

          <input
            type="file"
            accept="image/*"
            hidden
            id="photoUpload"
            onChange={handlePhotoUpload}
          />
          <label
            htmlFor="photoUpload"
            className="absolute bottom-1 right-1 bg-purple-600 p-1 rounded-full cursor-pointer"
          >
            <Edit2 size={14} className="text-white" />
          </label>
        </div>

        <div className="text-center md:text-left">
          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-1 text-lg font-semibold"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">
              {user.fullName}
            </h1>
          )}

          <p className="text-gray-500 mt-1">{user.email}</p>
          <p className="text-gray-400 mt-1 text-sm">
            Joined: {new Date(user.createdAt).toDateString()}
          </p>

          <button
            onClick={() => (editing ? updateName() : setEditing(true))}
            className="text-purple-600 text-sm mt-2"
          >
            {editing ? "Save name" : "Edit name"}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          icon={<CalendarCheck size={36} />}
          value={stats.totalBookings}
          label="Total Bookings"
          gradient="from-purple-400 to-purple-600"
        />

        <StatCard
          icon={<Phone size={36} />}
          value={stats.peopleCalled}
          label="People Called"
          gradient="from-purple-500 to-purple-700"
        />

        <StatCard
          icon={<Package size={36} />}
          value={stats.currentPackage}
          label="Current Package"
          gradient="from-purple-600 to-purple-800"
        />

        {/* <StatCard
          icon={<User size={36} />}
          value={(user.fullName || user.email).split(" ")[0]}
          label="Welcome!"
          gradient="from-purple-300 to-purple-500"
        /> */}
      </div>

      {/* Info Section */}
      <div className="bg-purple-50 rounded-3xl p-6 shadow-inner border border-purple-200">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Your Dashboard Overview
        </h2>
        <p className="text-gray-600">
          This is your profile area where you can track your bookings, calls, and
          current package. Your usage updates in real time.
        </p>
      </div>
    </div>
  );
};

export default Profile;

/* ---------- Small reusable card ---------- */
const StatCard = ({
  icon,
  value,
  label,
  gradient,
}: {
  icon: React.ReactNode;
  value: any;
  label: string;
  gradient: string;
}) => (
  <div
    className={`bg-gradient-to-r ${gradient} text-white rounded-3xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transform hover:scale-105 transition`}
  >
    {icon}
    <span className="text-3xl font-bold mt-2">{value}</span>
    <p className="text-sm mt-1">{label}</p>
  </div>
);
