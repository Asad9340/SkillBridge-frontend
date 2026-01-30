import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface IAvailabilityDataProps {
  id: string
  tutorId: string
  subjectId: string
  date: string
  startTime: string
  endTime: string
  isBooked: boolean
  subject: string
}

interface ManageAvailabilityTableProps {
  availabilityData: IAvailabilityDataProps[]
}

const ManageAvailabilityTable = ({ availabilityData }: ManageAvailabilityTableProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {availabilityData.map((item) => {
        const date = new Date(item.date)
        return (
          <Card key={item.id} className="w-full hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border border-gray-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight">
                  {item.subject}
                </CardTitle>
                <Badge
                  variant={item.isBooked ? "destructive" : "outline"}
                  className={`text-sm px-3 py-1 font-medium ${item.isBooked ? 'bg-red-100 text-red-800 border-red-200' : 'bg-green-100 text-green-800 border-green-200'}`}
                >
                  {item.isBooked ? "Booked" : "Available"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 flex items-center justify-between gap-4">
              <div className="flex-1 flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg mb-0">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </ div>
              <div className="flex-1 flex items-center gap-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="font-semibold text-gray-900">
                  {item.startTime} - {item.endTime}
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default ManageAvailabilityTable
