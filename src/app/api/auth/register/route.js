import { NextResponse } from 'next/server';
import dbConnection from '@/lib/mongo';
import User from '@/lib/models/User';

export async function POST(request) {
  try {
    await dbConnection();
    const { name, email, password, confirmPassword } = await request.json();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'Please fill in all fields' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: user.toJSON(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
