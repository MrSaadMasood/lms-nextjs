import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"


export default function TestResultTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Total MCQs</TableHead>
          <TableHead>Total Solved</TableHead>
          <TableHead>Total Correct</TableHead>
          <TableHead className="text-right" >Total Wrong</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={"random"}>
          <TableCell className="font-medium">100</TableCell>
          <TableCell>70</TableCell>
          <TableCell>50</TableCell>
          <TableCell >20</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
