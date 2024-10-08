import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TestResultTable({ totalMCQS, totalWrong, totalSolved, totalCorrect }: {
  totalMCQS: number,
  totalCorrect: number,
  totalSolved: number,
  totalWrong: number
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Total MCQs</TableHead>
          <TableHead>Total Solved</TableHead>
          <TableHead>Total Correct</TableHead>
          <TableHead className="text-right">Total Wrong</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key={"random"}>
          <TableCell className="font-medium">{totalMCQS}</TableCell>
          <TableCell>{totalSolved}</TableCell>
          <TableCell>{totalCorrect}</TableCell>
          <TableCell>{totalWrong}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
