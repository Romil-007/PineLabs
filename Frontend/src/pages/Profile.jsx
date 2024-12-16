import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Button from '../components/ui/Button'
import ProfileHeader from '../components/profile/ProfileHeader'
import InfoField from '../components/profile/InfoField'
import StoreDetails from '../components/profile/StoreDetails'
import PaymentConfig from '../components/profile/PaymentConfig'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  GlobeAltIcon 
} from '@heroicons/react/24/outline'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    businessName: 'My Store',
    email: 'contact@mystore.com',
    phone: '+91 98765 43210',
    address: '123 Business Street',
    timezone: 'Asia/Kolkata',
    storeDetails: {
      name: 'Main Branch',
      type: 'Retail Store',
      established: '2020',
      operatingHours: '9:00 AM - 9:00 PM'
    },
    paymentConfig: {
      cardProcessor: 'Stripe',
      merchantId: 'MERCH123456',
      upiId: 'mystore@upi',
      upiDisplayName: 'My Store'
    }
  })

  const handleUpdateField = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleUpdateStoreDetails = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      storeDetails: {
        ...prev.storeDetails,
        [field]: value
      }
    }))
  }

  const handleUpdatePaymentConfig = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      paymentConfig: {
        ...prev.paymentConfig,
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Profile updated successfully')
  }

  return (
    <div>
      <ProfileHeader 
        businessName={profileData.businessName}
        isEditing={isEditing}
      />

      <div className="mt-32 space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
            <Button
              variant={isEditing ? 'primary' : 'secondary'}
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : 'Update Details'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField
              icon={EnvelopeIcon}
              label="Email Address"
              value={profileData.email}
              editable={false}
              isEditing={isEditing}
            />
            <InfoField
              icon={PhoneIcon}
              label="Phone Number"
              value={profileData.phone}
              editable={false}
              isEditing={isEditing}
            />
            <InfoField
              icon={MapPinIcon}
              label="Business Address"
              value={profileData.address}
              editable={true}
              isEditing={isEditing}
              onChange={(value) => handleUpdateField('address', value)}
            />
            <InfoField
              icon={GlobeAltIcon}
              label="Timezone"
              value={profileData.timezone}
              editable={true}
              isEditing={isEditing}
              onChange={(value) => handleUpdateField('timezone', value)}
            />
          </div>
        </div>

        {/* Store Details */}
        <StoreDetails
          storeDetails={profileData.storeDetails}
          isEditing={isEditing}
          onUpdate={handleUpdateStoreDetails}
        />

        {/* Payment Configuration */}
        <PaymentConfig
          paymentConfig={profileData.paymentConfig}
          isEditing={isEditing}
          onUpdate={handleUpdatePaymentConfig}
        />
      </div>
    </div>
  )
}

export default Profile