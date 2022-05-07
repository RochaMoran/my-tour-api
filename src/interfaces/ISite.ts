import { Document } from 'mongoose'

export default interface ISite extends Document {
    name: string,
    description: string,
    imgUrl: any,
    country: string,
    covidMeasures: {
        vaccineCovid: boolean,
        faceMask: boolean,
        statusOpen: boolean,
    },
    attentionSchedules: {
        open: string,
        close: string
    },
    location: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number
    }
}