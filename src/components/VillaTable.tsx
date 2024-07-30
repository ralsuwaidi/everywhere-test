import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/catalyst/table'
import { Badge } from './catalyst/badge'

function VillaTable({ villas }: { villas: any[] }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Area (Sq. Ft.)</TableHeader>
                    <TableHeader>Status</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {villas.map((villa) => (
                    <TableRow key={villa.id} href={`villas/${villa.slug}`}>
                        <TableCell className="font-medium">{villa.id}</TableCell>
                        <TableCell className="">{villa.name}</TableCell>
                        <TableCell className='text-zinc-500'>{villa.villa_email}</TableCell>
                        <TableCell className="text-zinc-500">{villa.area_sq_feet}</TableCell>
                        <TableCell >
                            <Badge className='text-xs'> {villa.review_status}</Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default VillaTable