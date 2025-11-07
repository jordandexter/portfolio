export default async function ProjectViewer({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    return (
        <div className="flex h-10 w-100 border-2 border-red-500">{name}</div>
    )
}
