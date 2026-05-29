"use client"

export default function StreamingLoader() {

  return (

    <div className="flex justify-start animate-pulse">

      <div className="max-w-3xl w-full rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">

        {/* Line 1 */}

        <div className="h-4 rounded-full bg-white/10 w-2/3 mb-4" />

        {/* Line 2 */}

        <div className="h-4 rounded-full bg-white/10 w-full mb-4" />

        {/* Line 3 */}

        <div className="h-4 rounded-full bg-white/10 w-5/6 mb-4" />

        {/* Line 4 */}

        <div className="h-4 rounded-full bg-white/10 w-1/2" />

      </div>

    </div>
  )
}
