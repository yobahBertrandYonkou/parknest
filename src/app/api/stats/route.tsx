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
            $group: { 
                "_id": "$plotOwnerId", 
                "totalIncome": { $sum: "$total_price" }
            }
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
            $group: { 
                "_id": "$plot_id", 
                "totalIncome": { $sum: "$total_price" },
                "metadata": { $addToSet: { name: "$destination.name" }}
            }
        },
        {
            $sort: { name: -1 }
        }
    ]);

    // bookings per plot
    let numberOfBookingsPerPlot = mongoClient.collection('bookings').aggregate([
        {
            $match: { "plotOwnerId": params.get('userId') }
        }, 
        { 
            $group: { 
                "_id": "$plot_id", 
                "count": { $sum: 1 },
                "metadata": { $addToSet: { name: "$destination.name" }}
            }
        },
        {
            $sort: { name: -1 }
        }
    ]);

    let income = (await totalIncome.toArray())[0];
    if (income !== undefined){
        income = income.totalIncome
    }
    
    console.log();
    
    return NextResponse.json({
        status: 'ok',
        data: {
            totalIncome: income,
            totalBookings: totalBookings,
            incomePerPlot: await incomePerPlot.toArray(),
            totalPlots: totalPlots,
            numberOfBookingsPerPlot: await numberOfBookingsPerPlot.toArray()
        }
    });
}