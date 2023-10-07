import { NextResponse } from 'next/server';
import Post from '@/models/post';
import { connectToDB } from '@/utils/db';

export const GET = async (req, { params: { id } }) => {
  try {
    await connectToDB();
    const PostModel = await Post.findOne({
      number: id,
    });

    if (!PostModel) {
      return NextResponse.error(new Error('No post found'));
    }
    return NextResponse.json(PostModel);
  } catch (error) {
    return NextResponse.error(new Error('Error fetching post'));
  }
};
