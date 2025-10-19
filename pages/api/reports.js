import connectDB from '../../lib/mongodb';
import Report from '../../models/Report';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const report = new Report({
      title: req.body.title,
      description: req.body.description,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude],
      },
      reportType: req.body.reportType,
    });

    await report.save();
    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}
