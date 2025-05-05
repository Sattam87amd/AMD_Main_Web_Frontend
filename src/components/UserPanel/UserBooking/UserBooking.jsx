"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FaStar } from "react-icons/fa"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Calendar, Clock, CreditCard, Info, MessageSquare, Tag, User } from "lucide-react"

const UserToExpertBooking = () => {
  const [sessionData, setSessionData] = useState(null)
  const [consultingExpert, setConsultingExpert] = useState(null)
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    note: "",
    promoCode: "",
  })
  const [noteError, setNoteError] = useState("") // Error message for note
  const [noteWordCount, setNoteWordCount] = useState(0) // Word count
  const [token, setToken] = useState(null) // Ensure localStorage access only on client
  const [isSubmitting, setIsSubmitting] = useState(false) // To track if booking is in progress
  const router = useRouter()

  // Wait until component is mounted
  useEffect(() => {
    const expertData = localStorage.getItem("expertData")
    if (expertData) {
      setConsultingExpert(JSON.parse(expertData))
    }

    const storedSessionData = localStorage.getItem("sessionData")
    if (storedSessionData) {
      setSessionData(JSON.parse(storedSessionData))
    }

    const userToken = localStorage.getItem("userToken")
    if (!userToken) {
      router.push("/userlogin")
    }
    setToken(userToken)
  }, [])

  useEffect(() => {
    localStorage.setItem("bookingData", JSON.stringify(bookingData))
  }, [bookingData])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    if (name === "note") {
      const wordCount = value.trim().split(/\s+/).filter(Boolean).length
      setNoteWordCount(wordCount)
      setNoteError("") // Clear error when user starts typing
    }
  }

  const handleBookingRequest = async () => {
    if (!sessionData) {
      toast.error("No session data found.")
      return
    }

    if (noteWordCount < 25) {
      setNoteError("Note must contain at least 25 words.")
      toast.error("✍️ Your note must be at least 25 words.")
      return
    }

    // Calculate price based on expert's pricing or session duration
    const price = consultingExpert?.price || 99 // Default to expert's price or 99

    const fullBookingData = {
      expertId: consultingExpert?._id,
      areaOfExpertise: sessionData?.areaOfExpertise || "Home",
      slots: sessionData?.slots || [],
      duration: sessionData?.duration || "",
      firstName: bookingData?.firstName,
      lastName: bookingData?.lastName,
      email: bookingData?.email,
      phone: bookingData?.mobileNumber,
      note: bookingData?.note,
      price: price, // Add price to the booking data
    }

    if (
      !consultingExpert?._id ||
      !sessionData?.areaOfExpertise ||
      !sessionData.slots ||
      !bookingData.firstName ||
      !bookingData.lastName ||
      !bookingData.email
    ) {
      toast.error("Please fill in all required fields before submitting the booking.")
      return
    }

    try {
      setIsSubmitting(true) // Start processing state
      if (!token) throw new Error("No authentication token found")

      const response = await axios.post(
        "https://amd-api.code4bharat.com/api/session/usertoexpertsession",
        fullBookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      // Store the session ID for later reference
      localStorage.setItem("pendingSessionId", response.data.session._id)

      // Show info message before redirecting to payment
      toast.info("Redirecting to payment gateway...", {
        position: "bottom-center",
        autoClose: 2000,
      })

      // Redirect to the payment URL provided by TAP
      setTimeout(() => {
        window.location.href = response.data.paymentUrl
      }, 2000)
    } catch (error) {
      console.error("Booking error:", error.response?.data || error.message)
      toast.error(`Booking failed: ${error.response?.data?.message || error.message}`)
    } finally {
      setIsSubmitting(false) // Reset the processing state
    }
  }

  // Group time slots by date
  const groupByDate = (slots) => {
    return slots.reduce((grouped, slot) => {
      const date = slot.selectedDate
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(slot)
      return grouped
    }, {})
  }

  if (!consultingExpert)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-24 w-24 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    )

  return (
    <div className="w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Left Section - Expert Profile */}
        <div className="w-full lg:w-2/5 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#F8F7F3] p-6">
            <div className="flex items-center gap-6">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image
                  src={consultingExpert?.photoFile || "/guyhawkins.png"}
                  alt={`${consultingExpert?.firstName} ${consultingExpert?.lastName}`}
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {consultingExpert?.firstName} {consultingExpert?.lastName}
                </h1>
                <p className="text-gray-600">{consultingExpert?.areaOfExpertise || "Expert"}</p>
                <div className="flex items-center mt-2 gap-1">
                  {[...Array(5)].map((_, i) => {
                    const rating = consultingExpert.averageRating || 0
                    const isFilled = i < Math.floor(rating)
                    return <FaStar key={i} className={isFilled ? "text-[#FFA629]" : "text-gray-300"} size={16} />
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gray-600" />
                <span className="text-2xl font-bold text-gray-800">SAR {consultingExpert.price}</span>
              </div>
              <span className="text-gray-600 text-sm bg-white px-3 py-1 rounded-full shadow-sm">Per Session</span>
            </div>
          </div>

          <div className="p-6">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-gray-600" />
              <span>Selected Sessions</span>
            </h2>

            {sessionData?.slots &&
              Object.entries(groupByDate(sessionData?.slots)).map(([date, slots], idx) => (
                <div key={idx} className="mb-5 border-b border-gray-100 pb-4 last:border-0">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {slots.map((slot) => (
                      <div
                        key={slot.selectedTime}
                        className="px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-lg flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        {slot.selectedTime}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            <div className="mt-4 flex items-start gap-2 bg-amber-50 p-3 rounded-lg">
              <Info className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700">
                You can add up to 5 sessions at different time slots. Any 1 time slot might get selected based on expert
                availability.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="w-full lg:w-3/5">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Booking</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={bookingData.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={bookingData.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition"
                      placeholder="Doe"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={bookingData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Note to Expert</label>
                  <span className={`text-xs ${noteWordCount < 25 ? "text-red-500" : "text-green-600"}`}>
                    {noteWordCount}/25 words minimum
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="note"
                    placeholder="Introduce yourself and describe what you'd like to discuss in the session (minimum 25 words)..."
                    value={bookingData.note}
                    onChange={handleInputChange}
                    className={`w-full h-32 border ${noteError ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-black"} rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:border-transparent transition resize-none`}
                  />
                </div>
                {noteError && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <Info className="h-3 w-3" />
                    {noteError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="promoCode"
                      value={bookingData.promoCode}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-l-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-black focus:border-transparent transition"
                      placeholder="Enter promo code"
                    />
                  </div>
                  <button className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-r-lg font-medium transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Session Fee</span>
                    <span className="font-medium">SAR {consultingExpert.price}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total</span>
                      <span>SAR {consultingExpert.price}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookingRequest}
                  disabled={isSubmitting}
                  className={`w-full bg-black text-white rounded-lg px-8 py-4 text-base font-medium transition-all
                    ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 hover:shadow-lg"}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Proceed to Payment</span>
                    </div>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  By clicking "Proceed to Payment", you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default UserToExpertBooking
