import { supabaseAdmin } from '@/lib/supabase/server'

type CreateShipmentParams = {
  orderId: string
  serviceCode: string
  bigpostJobId?: string | null
  consignmentNumber?: string | null
  trackingNumber?: string | null
  labelUrl?: string | null
}

export async function createShipment({
  orderId,
  serviceCode,
  bigpostJobId,
  consignmentNumber,
  trackingNumber,
  labelUrl
}: CreateShipmentParams) {
  try {
    const { data, error } = await supabaseAdmin
      .from('shipments')
      .insert({
        order_id: orderId,
        service_code: serviceCode,
        bigpost_job_id: bigpostJobId,
        consignment_number: consignmentNumber,
        tracking_number: trackingNumber,
        label_url: labelUrl,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating shipment:', error)
      throw new Error(`Failed to create shipment: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in createShipment:', error)
    throw error
  }
}

export async function updateShipmentStatus(
  shipmentId: string,
  status: 'pending' | 'booked' | 'in_transit' | 'delivered' | 'failed',
  updates?: {
    bigpostJobId?: string
    consignmentNumber?: string
    trackingNumber?: string
    labelUrl?: string
  }
) {
  try {
    const updateData: any = { status }
    
    if (updates) {
      if (updates.bigpostJobId) updateData.bigpost_job_id = updates.bigpostJobId
      if (updates.consignmentNumber) updateData.consignment_number = updates.consignmentNumber
      if (updates.trackingNumber) updateData.tracking_number = updates.trackingNumber
      if (updates.labelUrl) updateData.label_url = updates.labelUrl
    }

    const { data, error } = await supabaseAdmin
      .from('shipments')
      .update(updateData)
      .eq('id', shipmentId)
      .select()
      .single()

    if (error) {
      console.error('Error updating shipment status:', error)
      throw new Error(`Failed to update shipment: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in updateShipmentStatus:', error)
    throw error
  }
}

export async function getShipmentByOrderId(orderId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('shipments')
      .select('*')
      .eq('order_id', orderId)
      .single()

    if (error) {
      console.error('Error fetching shipment by order ID:', error)
      throw new Error(`Failed to fetch shipment: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error('Error in getShipmentByOrderId:', error)
    throw error
  }
}
