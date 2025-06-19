"use client";

import React from "react";
import { useParams } from 'next/navigation';

const ProductListID = () => {
  const params = useParams();
  // params.slug is an array: ["shop", "1"]
  // To get the id (last segment), use:
  const slug = params.slug as string[]; // Type assertion for TypeScript
  const id = slug?.[slug.length - 1];   // Get the last segment

  return <div>User ID: {id}</div>;
};

export default ProductListID;
