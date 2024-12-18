import mongoose, { Document, Schema } from 'mongoose';

interface IProfile extends Document {
  name: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  facebook: string;
}

const ProfileSchema: Schema<IProfile> = new Schema(
  {
    name: { type: String, required: true },
    instagram: { type: String, required: true },
    linkedin: { type: String, required: true },
    twitter: { type: String, required: true },
    facebook: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
