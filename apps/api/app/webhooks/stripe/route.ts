import { log } from '@logtail/next';
import { parseError } from '@repo/design-system/lib/error';
import { stripe } from '@repo/design-system/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import type Stripe from 'stripe';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

if (!secret) {
  throw new Error('STRIPE_WEBHOOK_SECRET is not set');
}

const handleCheckoutSessionCompleted = async (
  data: Stripe.Checkout.Session
) => {
  if (!data.customer) {
    return;
  }

  const customerId =
    typeof data.customer === 'string' ? data.customer : data.customer.id;
  const users: any = []

  const user = users.data.find(
    (user: any) => user.privateMetadata.stripeCustomerId === customerId
  );

  if (!user) {
    return;
  }
};

const handleSubscriptionScheduleCanceled = async (
  data: Stripe.SubscriptionSchedule
) => {
  if (!data.customer) {
    return;
  }

  const customerId =
    typeof data.customer === 'string' ? data.customer : data.customer.id;
  const users: any = []

  const user = users.data.find(
    (user: any) => user.privateMetadata.stripeCustomerId === customerId
  );

  if (!user) {
    return;
  }
};

export const POST = async (request: Request): Promise<Response> => {
  try {
    const body = await request.text();
    const headerPayload = await headers();
    const signature = headerPayload.get('stripe-signature');

    if (!signature) {
      throw new Error('missing stripe-signature header');
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case 'checkout.session.completed': {
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      }
      case 'subscription_schedule.canceled': {
        await handleSubscriptionScheduleCanceled(event.data.object);
        break;
      }
      default: {
        log.warn(`Unhandled event type ${event.type}`);
      }
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    const message = parseError(error);

    log.error(message);

    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 }
    );
  }
};
