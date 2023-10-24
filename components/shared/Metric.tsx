import Image from "next/image";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
}

const Metric = ({ imgUrl, alt, value, title }: MetricProps) => {
  return (
    <div className="flex-center flex-wrap gap-1">
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className="object-contain"
      />

      <p className="small-medium text-dark400_light800 flex items-center gap-1">
        {value}

        <span className="small-regular line-clamp-1">{title}</span>
      </p>
    </div>
  );
};

export default Metric;
