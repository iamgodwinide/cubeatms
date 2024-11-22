"use client"
import React, { useState } from 'react'
import styles from './styles.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  return (
    <div className='container flex flex-col'>
      <form onSubmit={handleSubmit} className="w-full md:w-9/12 mx-auto">
        <h2 className='text-white text-2xl font-bold mt-20 md:text-5xl md:mt-40 mb-5'>Contact</h2>
        <div className={`${styles.formRow} w-full`}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.formControl}
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="name" className={styles.floatingLabel}>Name</label>
          </div>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.formControl}
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="email" className={styles.floatingLabel}>Email</label>
          </div>
        </div>
        <div className={styles.formGroup}>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={styles.formControl}
            value={formData.phone}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="phone" className={styles.floatingLabel}>Phone Number</label>
        </div>
        <div className={styles.formGroup}>
          <textarea
            id="message"
            name="message"
            className={`${styles.formControl} ${styles.textarea}`}
            value={formData.message}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label htmlFor="message" className={styles.floatingLabel}>Comment</label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  )
}

export default Contact