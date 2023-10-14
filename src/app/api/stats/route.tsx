import { NextResponse } from "next/server";
import mongoClient from "../../database/mongodb";

export async function GET(request: Request){
    let params = new URL(request.url).searchParams as URLSearchParams;

    // fetching total income
    let totalIncome = await mongoClient.collection('bookings').aggregate([
        {
            $match: { "plotOwnerId": params.get('userId') }
        }, 
        { 
            $group: { "_id": "$plotOwnerId", "totalIncome": { $sum: "$total_price" } }
        }
    ]);

    // fetching total number of plots
    let totalPlots = await mongoClient.collection('plots').countDocuments({ "user_id": params.get('userId')});

    // fetching total bookings
    let totalBookings = await mongoClient.collection('bookings').countDocuments({ "plotOwnerId": params.get('userId')});

    // total income per plot
    let incomePerPlot = mongoClient.collection('bookings').aggregate([
        {
            $match: { "plotOwnerId": params.get('userId') }
        }, 
        { 
            $group: { "_id": "$plot_id", "totalIncome": { $sum: "$total_price" } }
        }
    ]);

    // bookings per plot
    let numberOfBookingsPerPlot = mongoClient.collection('bookings').aggregate([
        {
            $match: { "plotOwnerId": params.get('userId') }
        }, 
        { 
            $group: { "_id": "$plot_id", "count": { $sum: 1 } }
        }
    ]);

    return NextResponse.json({
        status: 'ok',
        data: {
            totalIncome: totalIncome,
            totalBookings: totalBookings,
            incomePerPlot: incomePerPlot,
            totalPlots: totalPlots,
            numberOfBookingsPerPlot: numberOfBookingsPerPlot
        }
    });
}