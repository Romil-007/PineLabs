import { useState } from 'react'
import { BellIcon, EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import Toggle from '../ui/Toggle'

function NotificationSettings({ notifications, onUpdate }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Notification Preferences</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
          </div>
          <Toggle 
            enabled={notifications.email} 
            onChange={() => onUpdate('email')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-500">Get alerts via SMS</p>
            </div>
          </div>
          <Toggle 
            enabled={notifications.sms} 
            onChange={() => onUpdate('sms')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BellIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">App Notifications</p>
              <p className="text-sm text-gray-500">In-app notifications</p>
            </div>
          </div>
          <Toggle 
            enabled={notifications.app} 
            onChange={() => onUpdate('app')}
          />
        </div>
      </div>
    </div>
  )
}

export default NotificationSettings