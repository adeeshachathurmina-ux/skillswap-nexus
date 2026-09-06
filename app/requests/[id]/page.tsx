import RequestsRoute from '@/components/routes/requests-route';
export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) { return <RequestsRoute requestId={(await params).id} />; }
