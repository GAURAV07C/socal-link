"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"; // Assuming you have these components
import { Button } from "./ui/button"; // Assuming you have this button component

interface Profile {
  _id: string;
  name: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  facebook: string;
}

const ProfileCard = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API when the component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/user");
        const result = await response.json();

        if (response.ok) {
          setProfiles(result.profiles);
        } else {
          console.error("Failed to fetch profiles:", result.message);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to copy the profile link to clipboard
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {profiles.map((profile) => (
        <Card key={profile._id} className="bg-richblack-900 text-white">
          <CardHeader>
            <CardTitle className="text-white text-2xl">{profile.name}</CardTitle>
            <CardDescription className="text-gray-400">
              Social Media Links
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <strong>Instagram: </strong>
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {profile.instagram}
                </a>
                <Button
                  onClick={() => copyToClipboard(profile.instagram)}
                  className="ml-2 bg-blue-500 hover:bg-blue-600"
                >
                  Copy Link
                </Button>
              </li>
              <li>
                <strong>LinkedIn: </strong>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {profile.linkedin}
                </a>
                <Button
                  onClick={() => copyToClipboard(profile.linkedin)}
                  className="ml-2 bg-blue-500 hover:bg-blue-600"
                >
                  Copy Link
                </Button>
              </li>
              <li>
                <strong>Twitter: </strong>
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {profile.twitter}
                </a>
                <Button
                  onClick={() => copyToClipboard(profile.twitter)}
                  className="ml-2 bg-blue-500 hover:bg-blue-600"
                >
                  Copy Link
                </Button>
              </li>
              <li>
                <strong>Facebook: </strong>
                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {profile.facebook}
                </a>
                <Button
                  onClick={() => copyToClipboard(profile.facebook)}
                  className="ml-2 bg-blue-500 hover:bg-blue-600"
                >
                  Copy Link
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileCard;
