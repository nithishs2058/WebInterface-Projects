import { useState, useRef } from 'react'

const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say']
const COUNTRY_CODES = ['+91', '+1', '+44', '+61', '+971']
const MAX_PHOTO_MB = 2
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const INITIAL_FIELDS = {
  fullName: '',
  username: '',
  aadhaarName: '',
  aadhaarNumber: '',
  panNumber: '',
  dob: '',
  gender: '',
  countryCode: '+91',
  phone: '',
  email: '',
  password: '',
  permanentAddress: '',
  currentAddress: '',
}

function RegistrationForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [sameAddress, setSameAddress] = useState(false)
  const [errors, setErrors] = useState({})
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)
  const fileInputRef = useRef(null)

  const setField = (name, value) => {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const setError = (name, message) => {
    setErrors((prev) => {
      const next = { ...prev }
      if (message) next[name] = message
      else delete next[name]
      return next
    })
  }

  // ---------- field-level change handlers ----------

  const handleTextChange = (name) => (e) => {
    const value = e.target.value
    setField(name, value)

    if (name === 'username' || name === 'aadhaarName') {
      const nextFields = { ...fields, [name]: value }
      validateNameMatch(nextFields.username, nextFields.aadhaarName)
    }

    if (name === 'permanentAddress') {
      if (sameAddress) setField('currentAddress', value)
      if (value.trim()) setError('permanentAddress', null)
    }

    if (name === 'currentAddress' && value.trim()) {
      setError('currentAddress', null)
    }

    if (name === 'fullName' && value.trim()) setError('fullName', null)
    if (name === 'aadhaarNumber') validateAadhaarNumber(value)
    if (name === 'email' && value.trim()) setError('email', null)
    if (name === 'password') validatePassword(value)
  }

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
    setField('phone', digitsOnly)
    if (digitsOnly.length === 0) {
      setError('phone', 'Phone number is required')
    } else if (digitsOnly.length < 10) {
      setError('phone', 'Phone number must be exactly 10 digits')
    } else {
      setError('phone', null)
    }
  }

  const validateAadhaarNumber = (value) => {
    if (!value.trim()) {
      setError('aadhaarNumber', 'Aadhaar number is required')
      return
    }
    const digitsOnly = value.replace(/\D/g, '')
    if (digitsOnly.length !== 12) {
      setError('aadhaarNumber', 'Aadhaar number must be 12 digits')
    } else {
      setError('aadhaarNumber', null)
    }
  }

  const validateNameMatch = (username, aadhaarName) => {
    if (!username.trim() || !aadhaarName.trim()) {
      setError('nameMatch', null)
      return
    }
    if (username.trim().toLowerCase() !== aadhaarName.trim().toLowerCase()) {
      setError('nameMatch', 'Username and Aadhaar name do not match')
    } else {
      setError('nameMatch', null)
    }
  }

  const validateEmailValue = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value.trim()) {
      setError('email', 'Email is required')
      return false
    }
    if (!pattern.test(value.trim())) {
      setError('email', 'Enter a valid email address')
      return false
    }
    setError('email', null)
    return true
  }

  const validatePassword = (value) => {
    if (!value) {
      setError('password', 'Password is required')
      return false
    }
    const rules = [
      { test: value.length >= 8, message: 'at least 8 characters' },
      { test: /[A-Z]/.test(value), message: 'one uppercase letter' },
      { test: /[a-z]/.test(value), message: 'one lowercase letter' },
      { test: /[0-9]/.test(value), message: 'one number' },
    ]
    const failed = rules.filter((r) => !r.test)
    if (failed.length > 0) {
      setError('password', `Password needs ${failed.map((f) => f.message).join(', ')}`)
      return false
    }
    setError('password', null)
    return true
  }

  // ---------- checkbox ----------

  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked
    setSameAddress(checked)
    if (checked) {
      setField('currentAddress', fields.permanentAddress)
      if (fields.permanentAddress.trim()) setError('currentAddress', null)
    }
  }

  // ---------- photo upload ----------

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
      setError('photo', 'Only JPG, JPEG or PNG files are allowed')
      setPhoto(null)
      setPhotoPreview(null)
      return
    }

    const sizeMB = file.size / (1024 * 1024)
    if (sizeMB > MAX_PHOTO_MB) {
      setError('photo', `Photo must be smaller than ${MAX_PHOTO_MB} MB`)
      setPhoto(null)
      setPhotoPreview(null)
      return
    }

    setError('photo', null)
    setPhoto(file)
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  // ---------- submit / clear ----------

  const validateAll = () => {
    const newErrors = {}

    if (!fields.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!fields.username.trim()) newErrors.username = 'Username is required'
    if (!fields.aadhaarName.trim()) newErrors.aadhaarName = 'Aadhaar name is required'

    if (
      fields.username.trim() &&
      fields.aadhaarName.trim() &&
      fields.username.trim().toLowerCase() !== fields.aadhaarName.trim().toLowerCase()
    ) {
      newErrors.nameMatch = 'Username and Aadhaar name do not match'
    }

    const aadhaarDigits = fields.aadhaarNumber.replace(/\D/g, '')
    if (!fields.aadhaarNumber.trim()) newErrors.aadhaarNumber = 'Aadhaar number is required'
    else if (aadhaarDigits.length !== 12) newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits'

    if (fields.phone.length !== 10) newErrors.phone = 'Phone number must be exactly 10 digits'

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!fields.email.trim()) newErrors.email = 'Email is required'
    else if (!emailPattern.test(fields.email.trim())) newErrors.email = 'Enter a valid email address'

    const pwRules = [
      fields.password.length >= 8,
      /[A-Z]/.test(fields.password),
      /[a-z]/.test(fields.password),
      /[0-9]/.test(fields.password),
    ]
    if (!fields.password) newErrors.password = 'Password is required'
    else if (pwRules.includes(false)) newErrors.password = 'Password does not meet all requirements'

    if (!fields.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent address is required'
    if (!fields.currentAddress.trim()) newErrors.currentAddress = 'Current address is required'

    if (!photo) newErrors.photo = 'Profile photo is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validateAll()
    if (isValid) {
      setStatusMessage({ type: 'success', text: 'Form submitted successfully!' })
    } else {
      setStatusMessage({ type: 'error', text: 'Please fix the highlighted fields before submitting.' })
    }
  }

  const handleClear = () => {
    setFields(INITIAL_FIELDS)
    setSameAddress(false)
    setErrors({})
    setPhoto(null)
    setPhotoPreview(null)
    setStatusMessage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const fieldClass = (name) => `field-input${errors[name] ? ' has-error' : ''}`

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <div className="form-col">
        <section className="field-section">
          <h2>Personal Details</h2>

          <div className="field">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              className={fieldClass('fullName')}
              value={fields.fullName}
              onChange={handleTextChange('fullName')}
              placeholder="As per official records"
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="username">Username *</label>
              <input
                id="username"
                type="text"
                className={fieldClass('username')}
                value={fields.username}
                onChange={handleTextChange('username')}
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>
            <div className="field">
              <label htmlFor="aadhaarName">Aadhaar Name *</label>
              <input
                id="aadhaarName"
                type="text"
                className={fieldClass('aadhaarName')}
                value={fields.aadhaarName}
                onChange={handleTextChange('aadhaarName')}
              />
              {errors.aadhaarName && <span className="error-text">{errors.aadhaarName}</span>}
            </div>
          </div>

          {fields.username.trim() && fields.aadhaarName.trim() && (
            <span className={`match-indicator ${errors.nameMatch ? 'match-bad' : 'match-good'}`}>
              {errors.nameMatch ? '\u2717 Names do not match' : '\u2713 Names match'}
            </span>
          )}

          <div className="field-row">
            <div className="field">
              <label htmlFor="aadhaarNumber">Aadhaar Number *</label>
              <input
                id="aadhaarNumber"
                type="text"
                inputMode="numeric"
                className={fieldClass('aadhaarNumber')}
                value={fields.aadhaarNumber}
                onChange={handleTextChange('aadhaarNumber')}
                placeholder="12-digit number"
                maxLength={14}
              />
              {errors.aadhaarNumber && <span className="error-text">{errors.aadhaarNumber}</span>}
            </div>
            <div className="field">
              <label htmlFor="panNumber">PAN / Document Number</label>
              <input
                id="panNumber"
                type="text"
                className="field-input"
                value={fields.panNumber}
                onChange={handleTextChange('panNumber')}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="dob">Date of Birth</label>
              <input
                id="dob"
                type="date"
                className="field-input"
                value={fields.dob}
                onChange={handleTextChange('dob')}
              />
            </div>
            <div className="field">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="field-input"
                value={fields.gender}
                onChange={handleTextChange('gender')}
              >
                <option value="">Select</option>
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="field-section">
          <h2>Contact Details</h2>
          <div className="field-row">
            <div className="field field-narrow">
              <label htmlFor="countryCode">Country Code</label>
              <select
                id="countryCode"
                className="field-input"
                value={fields.countryCode}
                onChange={handleTextChange('countryCode')}
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="text"
                inputMode="numeric"
                className={fieldClass('phone')}
                value={fields.phone}
                onChange={handlePhoneChange}
                placeholder="10-digit number"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="text"
              className={fieldClass('email')}
              value={fields.email}
              onChange={handleTextChange('email')}
              onBlur={(e) => validateEmailValue(e.target.value)}
              placeholder="example@gmail.com"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </section>

        <section className="field-section">
          <h2>Security</h2>
          <div className="field">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              className={fieldClass('password')}
              value={fields.password}
              onChange={handleTextChange('password')}
              placeholder="8+ chars, upper, lower, number"
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
        </section>
      </div>

      <div className="form-col">
        <section className="field-section">
          <h2>Address Details</h2>
          <div className="field">
            <label htmlFor="permanentAddress">Permanent Address *</label>
            <textarea
              id="permanentAddress"
              className={fieldClass('permanentAddress')}
              value={fields.permanentAddress}
              onChange={handleTextChange('permanentAddress')}
              rows={2}
            />
            {errors.permanentAddress && <span className="error-text">{errors.permanentAddress}</span>}
          </div>

          <div className="field">
            <label htmlFor="currentAddress">Current Address *</label>
            <textarea
              id="currentAddress"
              className={fieldClass('currentAddress')}
              value={fields.currentAddress}
              onChange={handleTextChange('currentAddress')}
              disabled={sameAddress}
              rows={2}
            />
            {errors.currentAddress && <span className="error-text">{errors.currentAddress}</span>}
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={sameAddress} onChange={handleSameAddressToggle} />
            Current address is same as permanent address
          </label>
        </section>

        <section className="field-section">
          <h2>Photo Upload</h2>
          <div className="photo-row">
            <div className="field photo-field">
              <label htmlFor="photo">Profile Photo *</label>
              <input
                id="photo"
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png"
                className="field-input photo-input"
                onChange={handlePhotoChange}
              />
              <span className="hint-text">JPG, JPEG or PNG, max {MAX_PHOTO_MB} MB</span>
              {errors.photo && <span className="error-text">{errors.photo}</span>}
            </div>
            <div className="photo-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" />
              ) : (
                <span className="photo-placeholder">No photo</span>
              )}
            </div>
          </div>
        </section>
      </div>

      <div className="form-actions">
        <div className="action-buttons">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
        {statusMessage && (
          <p className={`status-message ${statusMessage.type === 'success' ? 'status-success' : 'status-error'}`}>
            {statusMessage.text}
          </p>
        )}
      </div>
    </form>
  )
}

export default RegistrationForm
