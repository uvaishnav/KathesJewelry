import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="flex flex-col">
      {/* Image */}
      <div className="aspect-square overflow-hidden mb-5">
        <Image
          src={member.image}
          alt={`${member.name} — ${member.role} at Kathe's Jewelry NYC`}
          width={400}
          height={400}
          className="object-cover object-top w-full h-full"
        />
      </div>

      {/* Name */}
      <h3 className="font-serif text-[20px] font-semibold text-[var(--text-on-light)] mb-1">
        {member.name}
      </h3>

      {/* Role */}
      <span className="font-sans text-[11px] tracking-[3px] uppercase text-[var(--gold-primary)] mb-3 block">
        {member.role}
      </span>

      {/* Bio */}
      <p className="font-body text-[15px] text-[var(--text-secondary)] leading-[1.7]">
        {member.bio}
      </p>
    </div>
  )
}
