import { useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

function ProfileHeader({ businessName, isEditing }) {
  const [profileImage, setProfileImage] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=Felix")
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5000000) {
        toast.error('Image size should be less than 5MB')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
        toast.success('Profile picture updated successfully')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="relative mb-8">
      {/* Cover Image */}
      <div className="h-64 w-full overflow-hidden rounded-xl">
        <div className="w-full h-full bg-gradient-to-r from-primary-600 to-primary-800 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px 30px'
            }} />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="absolute -bottom-24 left-8 flex items-end space-x-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 shadow-lg cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <PencilSquareIcon className="h-5 w-5" />
            </label>
          )}
        </div>
        <div className="pb-4">
          <h1 className="text-3xl font-bold text-gray-900 bg-white/80 px-4 py-1 rounded-lg backdrop-blur-sm">
            {businessName}
          </h1>
          <div className="flex items-center space-x-2 mt-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Premium Member
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Verified Business
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader