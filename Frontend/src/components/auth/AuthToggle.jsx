import { Switch } from '@headlessui/react'

function AuthToggle({ enabled, onChange, leftLabel = 'Email', rightLabel = 'Phone' }) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={`text-sm ${!enabled ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
        {leftLabel}
      </span>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? 'bg-primary-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
      <span className={`text-sm ${enabled ? 'font-medium text-primary-600' : 'text-gray-500'}`}>
        {rightLabel}
      </span>
    </div>
  )
}

export default AuthToggle