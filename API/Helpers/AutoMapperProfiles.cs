using System.Linq;
using API.Dtos;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
           CreateMap<AppUser,MemberDto >()
           .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src =>
            src.Photos.FirstOrDefault(p => p.IsMain).Url));
           CreateMap<Photo,PhotoDto >();
           CreateMap<MemberUpdateDto,AppUser>();
           CreateMap<RegisterDto,AppUser>();
           CreateMap<Message, MessageDto>()
           .ForMember(dest => dest.SenderPhotoUrl, opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
           .ForMember(dest => dest.RecipientPhotoUrl, opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
           
        }
    }
}